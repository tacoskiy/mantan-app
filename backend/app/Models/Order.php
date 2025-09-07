<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

class Order extends Model
{
    use HasFactory;

    public $incrementing = false;
    protected $keyType = 'string';

    protected $fillable = [
        'id',
        'ordered_at',
        'session_id',
    ];

    // Msessionとのリレーション
    public function msession()
    {
        // belongsTo(関連モデル, 自モデルの外部キー, 関連モデルの主キー)
        return $this->belongsTo(Msession::class, 'session_id', 'id');
    }

    // OrderItemとのリレーション
    public function orderItems()
    {
        // hasMany(関連モデル, 関連モデルの外部キー, 自モデルの主キー)
        return $this->hasMany(OrderItem::class, 'order_id', 'id');
    }

    protected static function boot()
    {
        parent::boot();

        static::creating(function ($model) {
            if (empty($model->id)) {
                $model->id = (string) Str::uuid();
            }
        });
    }
}
