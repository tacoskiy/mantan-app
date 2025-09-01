<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Msession extends Model
{
    //
        protected $fillable = [
        'status',
        'datetime',
        'end_at',
        'total_price',
        'table_number',
    ];

    public function table()
    {
        return $this->belongsTo(Table::class, 'sessions_id', 'id');
    }

    public function orders()
    {
        return $this->hasMany(Order::class, 'orders_id', 'id');
    }

}
