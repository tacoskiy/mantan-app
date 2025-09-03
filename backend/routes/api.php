<?php

use App\Http\Controllers\SessionController;
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

//session
Route::post('/createSession', [SessionController::class, 'createSession']);

Route::get('/readSession', [SessionController::class, 'readSession']);

Route::put('/updateSession/{id}', [SessionController::class, 'updateSession']);

Route::delete('/deleteSession/{id}', [SessionController::class, 'deleteSession']);




//Order
// Route::get('/createSession', [SessionController::class, 'createSession']);

// Route::get('/readSession', [SessionController::class, 'createSession']);

// Route::get('/updateSession', [SessionController::class, 'createSession']);

// Route::get('/deleteSession', [SessionController::class, 'createSession']);




// //OrderItem
// Route::get('/createSession', [SessionController::class, 'createSession']);

// Route::get('/readSession', [SessionController::class, 'createSession']);

// Route::get('/updateSession', [SessionController::class, 'createSession']);

// Route::get('/deleteSession', [SessionController::class, 'createSession']);




// //Menu
// Route::get('/createSession', [SessionController::class, 'createSession']);

// Route::get('/readSession', [SessionController::class, 'createSession']);

// Route::get('/updateSession', [SessionController::class, 'createSession']);

// Route::get('/deleteSession', [SessionController::class, 'createSession']);