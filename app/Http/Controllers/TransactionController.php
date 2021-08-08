<?php

namespace App\Http\Controllers;

use App\Models\Setting;
use App\Models\Transaction;
use Carbon\Carbon;
use Carbon\CarbonPeriod;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\DB;

class TransactionController extends Controller
{
    /**
     * @param $permanentDomain
     * @param $productId
     *
     *
     * @return \Illuminate\Contracts\Foundation\Application|\Illuminate\Contracts\View\Factory|\Illuminate\Contracts\View\View|JsonResponse
     */
    public function storeFrontView($permanentDomain,$productId)
    {
        if ($permanentDomain === null || $productId === null){
            return $this->sendErrorResponse(null, 'Permanent Domain or product id is not received', Response::HTTP_UNPROCESSABLE_ENTITY);
        }
        $transaction = Transaction::where('shopify_product_id',$productId)->get();
        if ($transaction !== null){
            return view('store-front',["permanentDomain"=>$permanentDomain,"productId"=>$productId]);
        }
    }

    /**
     * @param $permanentDomain
     * @param $productId
     *
     *
     * @return \Illuminate\Contracts\Foundation\Application|\Illuminate\Contracts\View\Factory|\Illuminate\Contracts\View\View|JsonResponse
     */
    public function storeFrontModelView($permanentDomain,$productId)
    {
        if ($permanentDomain === null || $productId === null){
            return $this->sendErrorResponse(null, 'Permanent Domain or product id is not received', Response::HTTP_UNPROCESSABLE_ENTITY);
        }
        $transaction = Transaction::where('shopify_product_id',$productId)->get();
        if ($transaction !== null){
            return view('store-front-model',["permanentDomain"=>$permanentDomain,"productId"=>$productId]);
        }
    }

    /**
     * @param Request $request
     * @param $shopifyShop
     * @param $productId
     *
     *
     * @return JsonResponse
     */
    public function transactionDataForSingleProduct(Request $request, $shopifyShop, $productId)
    {
        $user = $request->user;
        $perpage = $request->perpage;
        $country = $request->country;
        $requestPid = $productId;
//        return Error on Product Id or Setting Null
        if (!isset($requestPid)) {
            return $this->sendErrorResponse(null, 'Product Id can not be found', Response::HTTP_UNPROCESSABLE_ENTITY);
        }
        $product = Transaction::where('shopify_product_id', $requestPid)->get();
//      return Error on Product Null
        if ($product->count() == 0) {
            return $this->sendErrorResponse(null, 'Product can Not be found', Response::HTTP_UNPROCESSABLE_ENTITY);
        }
        $setting = Setting::where('user_id', $user->id)->first();
        $settingDateRange = $setting && $setting->date_range ? $setting->date_range : "three-month";
//      return Error on Product Null
        if (!isset($settingDateRange)) {
            return $this->sendErrorResponse(null, 'Setting or DateRange can Not be found', Response::HTTP_UNPROCESSABLE_ENTITY);
        }
        $transactions = Transaction::where('shopify_product_id',$requestPid)->country($country)->interval($settingDateRange, $user->timezone);
        $transactionsData = new TransactionResource($transactions);
        $countries = Transaction::where('shopify_product_id', $requestPid)->where('country','<>','')->interval($settingDateRange,$user->timezone)->distinct()->get('country');
        if ($settingDateRange === 'six-month') {
            $monthNumber = 6;
            $days = 180;
        } elseif ($settingDateRange === 'nine-month') {
            $monthNumber = 9;
            $days = 270;
        } elseif ($settingDateRange === 'one-year') {
            $monthNumber = 12;
            $days = 365;
        } else {
            $monthNumber = 3;
            $days = 90;
        }

        $date = date('d/m/Y',strtotime(Carbon::now($user->timezone)));
        $currentDate = Carbon::now($user->timezone);
        $oldDate = $currentDate->subMonth($monthNumber-1);
        $oldDate = date('01/m/Y',strtotime($oldDate));
        $startDate = Carbon::createFromFormat('d/m/Y', $date);
        $endDate = Carbon::createFromFormat('d/m/Y', $oldDate);

        $results = Transaction::select(DB::raw("DATE_FORMAT(date,'%Y-%m') as monthNum, sum(quantity) as sums"))
            ->where('shopify_product_id',$requestPid)
            ->interval($settingDateRange, $user->timezone)
            ->orderBy('monthNum')
            ->groupBy('monthNum');
        if ($country !== null){
            $results =  $results->where('country',$country);
        }
        $results = $results->get();

        $date = $startDate->format('Y-m-d');
        $oldDate = $endDate->format('Y-m-d');
        $takeAllDate = CarbonPeriod::create($oldDate, '1 month',$date);
        $dateArrays = [];
        foreach ($takeAllDate as $dt) {
            array_push($dateArrays,$dt->format("Y-m"));
        }

        $key = 0;
        $combineArray = collect($dateArrays)->map(function ($item) use ($results,&$key){
            if (isset($results[$key]) && $item === $results[$key]->monthNum){
                $valuemonthNum = $results[$key]->monthNum;
                $valuesums = $results[$key]->sums;
                $key++;
            }
            else{
                $valuemonthNum = $item;
                $valuesums = "0";
            }
            return (object) [
                'monthNum' => $valuemonthNum,
                'sums'     => $valuesums,
            ];
        });

        $monthNameString = collect($combineArray)->keyBy('monthNum')->map(function ($item) {
            $item->monthNum = \Carbon\Carbon::parse($item->monthNum);
            return $item;
        });

        $periods = new DatePeriod($monthNameString->min('monthNum'), \Carbon\CarbonInterval::month(), $monthNameString->max('monthNum')->addMonth());

        $monthWiseRecord = array_map(function ($period) use ($monthNameString) {
            $month = $period->format('Y-m');
            return (object) [
                'monthNum' => $period->format('M Y'),
                'sums'     => $monthNameString[$month] ? $monthNameString[$month]->sums : "0",
            ];
        }, iterator_to_array($periods));

        $arrayMonths = [];
        $arraySums = [];
        foreach ($monthWiseRecord as $month){
            array_push($arrayMonths,$month->monthNum);
            array_push($arraySums,$month->sums);
        }
        return $this->sendResponse([
            'arrayMonths'      => $arrayMonths,
            'arraySums'        => $arraySums,
            'transactionsData' => $transactionsData,
            'days'             => $days,
            'setting'          => $setting,
            'countries'        => $countries
        ], 'Transaction data Date and product wise retrieved successfully', Response::HTTP_OK);
    }
}
