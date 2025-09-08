<?php

namespace App\Http\Controllers;
use App\Models\OrderItem;

use Illuminate\Http\Request;

class OrderItemController extends Controller
{
    //
    public function createOrderItem(Request $request)
    {
        $validated = $request->validate([
            'status' => 'required|string',
            'menu' => 'required|uuid',
            'order_id' => 'required|exists:orders,id',
        ]);

        $orderItem = OrderItem::create([
            'status' => $validated['status'],
            'menu' => $validated['menu'],
            'order_id' => $validated['order_id'],
        ]);

        return response()->json($orderItem, 201);
    }

    public function readOrderItem()
    {
        $orderItems = OrderItem::all();

        return response()->json($orderItems, 200);
    }

    public function updateOrderItem(Request $request, $id)
    {
        $validated = $request->validate([
            'status' => 'sometimes|string',
            'menu' => 'sometimes|uuid',
            'order_id' => 'sometimes|exists:orders,id',
        ]);

        $orderItem = OrderItem::findOrFail($id); // id で検索
        $orderItem->update($validated); // バリデーション済みデータだけ更新

        return response()->json($orderItem , 200);
    }

    public function deleteOrderItem($id)
    {
        $orderItem = OrderItem::findOrFail($id); // id で検索
        $orderItem->delete();

        return response()->json([
            'message' => 'Session deleted successfully'
        ], 200);
    }   
}
