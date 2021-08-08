<?php

namespace App\Http\Controllers;

use App\Models\Setting;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Auth;

class SettingController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @param Request $request
     * @return array|string
     */
    public function index(Request $request)
    {
        $shop = Auth::user();
        if (isset($shop->setting)){
            return new SettingResource($shop->setting);
        }
        return [];
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param Request $request
     * @return JsonResponse
     */
    public function store(Request $request)
    {
        $user = Auth::user();

        $setting = Setting::updateOrCreate(
            ['user_id' => $user->id ],
            [
                'title' => $request->title,
                'sub_title' => $request->subTitle,
                'list_title' => $request->listTitle,
                'chart_type' => $request->selectedChart,
                'application_status' => $request->application_status === false ? 0 : 1,
                'is_table_enabled' => $request->isTableEnable === false ? 0 : 1,
                'date_range'=>$request->dateRange,
                'product_page_modal' => $request->view,
                'modal_button_position' => $request->modal_button_position,
                'floating_logo_path' => 'public/storage/images/logo.png',
                'logo_display_position' => 'left'
            ]
        );
        $setting->save();
        return $this->sendResponse(['setting'=> $setting], 'Setting Saved Successfully', Response::HTTP_OK);
    }
}
