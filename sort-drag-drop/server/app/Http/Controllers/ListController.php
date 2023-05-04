<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use DB;

class ListController extends Controller
{
    public function getItems(){
        return DB::table('lists')->orderBy('order', 'asc')->get();
    }

    public function uploadOrder(Request $request){
        $newOrder = $request->input('newOrder');
        foreach ($newOrder as $index => $itemId) {
            DB::table('lists')
                ->where('id', $itemId)
                ->update(['order' => $index + 1]);
        }

        return response()->json(['success' => true]);
    }
}
