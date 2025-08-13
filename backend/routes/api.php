<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/hello', function (Request $request) {
   return response()->json([
       'message' => 'Hello, API!',
       'data' => [
           'id' => 1,
           'name' => 'Sample Data'
       ]
   ]);
});