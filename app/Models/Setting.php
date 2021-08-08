<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

/**
 * App\Models\Setting
 *
 * @property int $id
 * @property int $user_id
 * @property string|null $title
 * @property string|null $sub_title
 * @property string|null $list_title
 * @property int $application_status 1: Enable; 0: Disable
 * @property string $chart_type
 * @property int $is_table_enabled 1: Enable; 0: Disable
 * @property string $product_page_modal
 * @property string $modal_button_position
 * @property string $floating_logo_path
 * @property string $logo_display_position
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property string $date_range
 * @method static \Illuminate\Database\Eloquent\Builder|Setting newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Setting newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Setting query()
 * @method static \Illuminate\Database\Eloquent\Builder|Setting whereApplicationStatus($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Setting whereChartType($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Setting whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Setting whereDateRange($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Setting whereFloatingLogoPath($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Setting whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Setting whereIsTableEnabled($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Setting whereListTitle($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Setting whereLogoDisplayPosition($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Setting whereModalButtonPosition($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Setting whereProductPageModal($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Setting whereSubTitle($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Setting whereTitle($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Setting whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Setting whereUserId($value)
 * @mixin \Eloquent
 */
class Setting extends Model
{
    use HasFactory;
    protected $fillable = [
        'user_id',
        'title',
        'sub_title',
        'list_title',
        'chart_type',
        'application_status',
        'is_table_enabled',
        'product_page_modal',
        'modal_button_position',
        'floating_logo_path',
        'logo_display_position',
        'date_range'
    ];
}
