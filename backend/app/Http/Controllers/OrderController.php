<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Msession;
use App\Models\Order;

class OrderController extends Controller
{
    //
    public function createOrder(Request $request)
    {
        $validated = $request->validate([
            'ordered_at' => 'required|date',
            'session_id' => 'required|exists:msessions,id',
        ]);

        $order = Order::create([
            'ordered_at' => $validated['ordered_at'],
            'session_id' => $validated['session_id'],
        ]);

        return response()->json($order, 201);
    }

    public function readOrder()
    {
        $orders = Order::all();

        return response()->json($orders, 200);
    }

    public function updateOrder(Request $request, $id)
    {
        $validated = $request->validate([
            'ordered_at' => 'sometimes|date',
            'session_id' => 'sometimes|exists:msessions,id',
        ]);

        $order = Order::findOrFail($id); // id で検索
        $order->update($validated); // バリデーション済みデータだけ更新

        return response()->json($order , 200);
    }

    public function deleteOrder($id)
    {
        $order = Order::findOrFail($id); // id で検索
        $order->delete();

        return response()->json(null, 204);
    }

}
