<?php

use App\Http\Controllers\Admin\AdminBranchController;
use App\Http\Controllers\Admin\AdminCoinRequestController;
use App\Http\Controllers\Admin\AdminOverViewController;
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

Route::middleware('jwt.auth')->group(function () {
    Route::middleware('role:Branch')->group(function () {
        Route::get('messages', [BranchMessageController::class, 'index']);
        Route::post('messages', [BranchMessageController::class, 'store']);
        Route::delete('messages/{id}', [BranchMessageController::class, 'destroy']);
        Route::get('reviews', [BranchReviewController::class, 'index']);
        Route::delete('reviews/{id}', [BranchReviewController::class, 'destroy']);
        Route::get('stations', [BranchStationController::class, 'index']);
        Route::put('stations/{id}', [BranchStationController::class, 'update']);
        Route::get('rides', [BranchRideController::class, 'index']);
        Route::put('rides/{id}', [BranchRideController::class, 'update']);
    });
});
Route::middleware('jwt.auth')->group(function () {
    Route::middleware('role:Passenger')->group(function () {
        Route::post('logout', [UserController::class, 'logout']);
        Route::post('reviews', [BranchReviewController::class, 'store']);
        Route::post('reviews', [BranchReviewController::class, 'store']);
    });
});
Route::middleware('jwt.auth')->group(function () {
    Route::middleware('role:Admin')->group(function () {
        Route::get('overview',[AdminOverViewController::class,'index']);
        Route::get('coinrequests', [AdminCoinRequestController::class, 'index']);
        Route::post('registerbranch', [AdminBranchController::class, 'create_branch']);
        Route::post('email', [AdminBranchController::class, 'store']);
    });
});



Route::middleware('guest')->group(function () {
    Route::post('register', [UserController::class, "register"])->name('register');
    Route::post('login', [UserController::class, "login"])->name('login');
});
