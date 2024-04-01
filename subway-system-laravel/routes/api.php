<?php

use App\Http\Controllers\Admin\AdminBranchController;
use App\Http\Controllers\Admin\AdminCoinRequestController;
use App\Http\Controllers\Branch\BranchMessageController;
use App\Http\Controllers\Branch\BranchReviewController;
use App\Http\Controllers\Branch\BranchRideController;
use App\Http\Controllers\Branch\BranchStationController;
use App\Http\Controllers\UserController;
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
Route::get('rides', [BranchRideController::class, 'index']);
Route::put('rides/{id}', [BranchRideController::class, 'index']);
Route::get('coinrequests', [AdminCoinRequestController::class, 'index']);
Route::get('/email', [AdminBranchController::class, 'index']);

Route::post('login', [UserController::class, "login"]);
Route::post('register', [UserController::class, "register"]);
