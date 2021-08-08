<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Order;

class OrderController extends Controller
{
    /**
     * @param Request $request
     *
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function index(Request $request)
    {
        //
        $perpage = $request->perpage;
        $country = $request->country;
        if($country !== null)
        {
            $orders = Order::where('country',$country)->paginate($perpage);
        }
        else{
            $orders  = Order::paginate($perpage);
        }
        return response()->json(['status'=>200,'data'=>$orders]);
    }


    /**
     *
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }

    /**
     *
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function getCountry()
    {
        $countries = Order::distinct()->get('country');
        return response()->json(['status'=>200,'data'=>$countries]);
    }

    /**
     *
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function getcount()
    {
        $orders = Order::all();
        $count = count($orders);
        return response()->json(['status'=>200,'data'=>$count]);
    }
}
