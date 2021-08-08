<?php

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

/**
 * App\Models\Transaction
 *
 * @property int $id
 * @property int $user_id
 * @property int $shopify_order_id
 * @property int $shopify_product_id
 * @property int $shopify_variant_id
 * @property int $shopify_customer_id
 * @property string $buyer_name
 * @property string $country
 * @property int $quantity
 * @property string $date
 * @property string $order_details
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @method static \Illuminate\Database\Eloquent\Builder|Transaction newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Transaction newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Transaction query()
 * @method static \Illuminate\Database\Eloquent\Builder|Transaction whereBuyerName($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Transaction whereCountry($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Transaction whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Transaction whereDate($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Transaction whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Transaction whereOrderDetails($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Transaction whereQuantity($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Transaction whereShopifyCustomerId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Transaction whereShopifyOrderId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Transaction whereShopifyProductId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Transaction whereShopifyVariantId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Transaction whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Transaction whereUserId($value)
 * @mixin \Eloquent
 */
class Transaction extends Model
{
    use HasFactory;
    protected $guarded=[];
    protected $hidden = ['order_details'];

    /**
     *
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function order(){
        return $this->belongsTo(Order::class,'shopify_order_id','shopify_order_id');
    }

    /**
     * @param $query
     * @param $country
     *
     *
     * @return mixed
     */
    public function scopeCountry($query, $country){
        if($country !== null){
            return $query->where('country',$country);
        } else {
            return $query;
        }

    }

    /**
     * @param $query
     * @param $interval
     * @param $timezone
     *
     *
     */
    public function scopeInterval($query, $interval , $timezone){
        if($interval === 'three-month'){
            $this->scopeThreemonths($query, $timezone);
        } else if ($interval === 'six-month'){
            $this->scopeSixmonths($query, $timezone);
        }else if ($interval === 'nine-month'){
            $this->scopeNinemonths($query, $timezone);
        }else if ($interval === 'one-year'){
            $this->scopeYear($query, $timezone);
        }
    }

    /**
     * @param $query
     * @param $timezone
     *
     *
     * @return mixed
     */
    public function scopeThreemonths($query, $timezone){
        $today = Carbon::now($timezone);
        $threeMonthPrevDate = Carbon::now()->subMonths(2);
        $threeMonthPrevDate = $threeMonthPrevDate->firstOfMonth();
        return $query->whereBetween('date',[$threeMonthPrevDate->toDateTimeString(),$today->toDateTimeString()]);
    }

    /**
     * @param $query
     * @param $timezone
     *
     *
     * @return mixed
     */
    public function scopeSixmonths($query, $timezone){
        $today = Carbon::now($timezone);
        $sixMonthPrevDate = Carbon::now()->subMonths(5);
        $sixMonthPrevDate = $sixMonthPrevDate->firstOfMonth();
        return $query->whereBetween('date',[$sixMonthPrevDate->toDateTimeString(),$today->toDateTimeString()]);
    }

    /**
     * @param $query
     * @param $timezone
     *
     *
     * @return mixed
     */
    public function scopeNinemonths($query, $timezone){
        $today = Carbon::now($timezone);
        $nineMonthPrevDate = Carbon::now()->subMonths(8);
        $nineMonthPrevDate = $nineMonthPrevDate->firstOfMonth();
        return $query->whereBetween('date',[$nineMonthPrevDate->toDateTimeString(),$today->toDateTimeString()]);
    }

    /**
     * @param $query
     * @param $timezone
     *
     *
     * @return mixed
     */
    public function scopeYear($query, $timezone){
        $today = Carbon::now($timezone);
        $yearPrevDate = Carbon::now()->subMonths(11);
        $yearPrevDate = $yearPrevDate->firstOfMonth();
        return $query->whereBetween('date',[$yearPrevDate->toDateTimeString(),$today->toDateTimeString()]);
    }
}
