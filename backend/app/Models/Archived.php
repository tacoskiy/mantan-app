<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Archived extends Model
{
    //
    protected $fillable = [
        'closed_at',
        'session_data',
    ];
}
