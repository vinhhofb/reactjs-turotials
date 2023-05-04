<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\DB;
/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
Route::post('save-tags', function (Request $request) {

    DB::table('tags')->where('id', 1)->update(['name' => $request->data]);
    return response()->json([
        'status' => 1,
    ]);
});
Route::get('get-tags', function () {
    return $tag = DB::table('tags')->first();
});
