<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str; 


class Msession extends Model
{
    //
        protected $fillable = [
        'status',
        'datetime',
        'end_at',
        'total_price',
        'table_number',
        'table_id'
    ];

    public function table()
    {
        return $this->belongsTo(Table::class, 'table_id', 'id');
    }

    public function orders()
    {
        return $this->hasMany(Order::class, 'orders_id', 'id');
    }

    protected static function boot()
    {
        parent::boot();

        static::creating(function ($model) {
            if (empty($model->id)) {
                $model->id = (string) Str::uuid(); // ← Illuminate\Support\Str を使う
            }
        });
    }

}
