<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    //
    protected $fillable = [
        'ordered_at',
        'orderItems',
        'sessions_id',
    ];

    public function msessions()//kokokaeruyo
    {
        return $this->belongsTo(Session::class, 'orders_id', 'id');
    }

    public function orderItems()
    {
        return $this->hasMany(OrderItem::class, 'order_items_id', 'id');
    }
}
