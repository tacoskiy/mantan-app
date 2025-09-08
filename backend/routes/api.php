<?php

use App\Http\Controllers\OrderController;
use App\Http\Controllers\SessionController;
use App\Http\Controllers\OrderItemController;
use App\Http\Controllers\MenuController;
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




// //Order
Route::post('/createOrder', [OrderController::class, 'createOrder']);

Route::get('/readOrder', [OrderController::class, 'readOrder']);

Route::put('/updateOrder/{id}', [OrderController::class, 'updateOrder']);

Route::delete('/deleteOrder/{id}', [OrderController::class, 'deleteOrder']);




// //OrderItem
Route::post('/createOrderItem', [OrderItemController::class, 'createOrderItem']);

Route::get('/readOrderItem', [OrderItemController::class, 'readOrderItem']);

Route::put('/updateOrderItem/{id}', [OrderItemController::class, 'updateOrderItem']);

Route::delete('/deleteOrderItem/{id}', [OrderItemController::class, 'deleteOrderItem']);




// //Menu
Route::post('/createMenu', [MenuController::class, 'createMenu']);

Route::get('/readMenu', [MenuController::class, 'readMenu']);

Route::put('/updateMenu/{id}', [MenuController::class, 'updateMenu']);

Route::delete('/deleteMenu/{id}', [MenuController::class, 'deleteMenu']);