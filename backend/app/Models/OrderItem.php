<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class OrderItem extends Model
{
    //
    protected $fillable = [
        'status',
        'menu',
        'order_items_id',
    ];

    public function order()
    {
        return $this->belongsTo(Order::class, 'order_items_id', 'id');
    }

    public function menu()
    {
        return $this->hasOen(Menu::class, 'menus_id', 'id');
    }
}
