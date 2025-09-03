<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Menu extends Model
{
    //
    protected $fillable = [
        'name',
        'detail',
        'price',
        'image_path',
        'allergen',
        'category',
    ];

    public function orderItem()
    {
        return $this->belongsTo(OrderItem::class, 'menus_id', 'id');
    }
}
