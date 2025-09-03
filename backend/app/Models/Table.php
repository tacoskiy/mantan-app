<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Table extends Model
{
    //

    use HasFactory;

    protected $fillable = [
        'table_number',
        'seats_count',
    ];

    public function msessions()//kokokaeruyo
    {
        return $this->hasMany(Msession::class, 'table_id', 'id');
    }



    public $incrementing = false; // 自動採番しない
    protected $keyType = 'string'; // 主キーの型は文字列

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
