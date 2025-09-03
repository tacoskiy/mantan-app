<?php

namespace App\Http\Controllers;

use App\Models\Msession;
use Illuminate\Http\Request;

class SessionController extends Controller
{
    //

    public function createSession(Request $request)
    {
        $validated = $request->validate([
            'status' => 'required|string',
            'datetime' => 'required|date',
            'end_at' => 'required|date|after:datetime',
            'total_price' => 'required|integer',
            'table_number' => 'required|integer',
            'table_id' => 'required|exists:tables,id',
        ]);

        $session = Msession::create([
            'status' => $validated['status'],
            'datetime' => $validated['datetime'],
            'end_at' => $validated['end_at'],
            'total_price' => $validated['total_price'],
            'table_number' => $validated['table_number'],
            'table_id' => $validated['table_id'],
        ]);

        return response()->json($session, 201);
    }



    public function readSession()
    {
        $sessions = Msession::all();

        return response()->json($sessions, 200);
    }

    public function updateSession(Request $request, $id)
    {
        $validated = $request->validate([
            'status' => 'sometimes|string',
            'datetime' => 'sometimes|date',
            'end_at' => 'sometimes|date|after:datetime',
            'total_price' => 'sometimes|integer',
            'table_number' => 'sometimes|integer',
            'table_id' => 'sometimes|exists:tables,id',
        ]);

        $session = Msession::findOrFail($id); // id で検索
        $session->update($validated); // バリデーション済みデータだけ更新

        return response()->json($session , 200);
    }

    public function deleteSession($id)
    {

        $session = Msession::findOrFail($id);
        $session->delete();

        return response()->json([
            'message' => 'Session deleted successfully'
        ], 200);
    }
}
