<?php

use App\Http\Controllers\Branch\BranchMessageController;
use App\Http\Controllers\Branch\BranchReviewController;
use App\Http\Controllers\Branch\BranchStationController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

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
Route::get('messages', [BranchMessageController::class, 'index']);
Route::post('messages', [BranchMessageController::class, 'store']);
Route::delete('messages/{id}', [BranchMessageController::class, 'destroy']);
Route::get('reviews', [BranchReviewController::class, 'index']);
Route::post('reviews', [BranchReviewController::class, 'index']);
Route::delete('reviews/{id}', [BranchReviewController::class, 'index']);
Route::get('stations', [BranchStationController::class, 'index']);
Route::put('stations/{id}', [BranchStationController::class, 'update']);
