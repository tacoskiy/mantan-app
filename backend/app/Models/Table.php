<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Table extends Model
{
    //
    protected $fillabel = [
        'table_number',
        'seats_count',
    ]

    public function msessions()//kokokaeruyo
    {
        return $this->hasMany(Session::class, 'sessions_id', 'id');
    }
}
