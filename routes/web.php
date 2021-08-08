<?php

use App\Http\Controllers\SettingController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return view('app');
})->middleware(['verify.shopify','billable'])->name('home');

Route::group(["middleware" => ["web", "verify.shopify"]], function() {
    Route::get("/get-settings", [SettingController::class, 'index'])->name('get-settings');
    Route::post("/save-settings", [SettingController::class, 'store'])->name('save-settings');
});

Route::get('store-front/{permanentDomain}/{id}',[TransactionController::class,'storeFrontView']);
Route::get('store-front-model/{permanentDomain}/{id}',[TransactionController::class,'storeFrontModelView']);

Route::get('flush', function(){
    request()->session()->flush();
});
