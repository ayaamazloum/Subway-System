<?php

use App\Http\Controllers\Admin\AdminBranchController;
use App\Http\Controllers\Admin\AdminCoinRequestController;
use App\Http\Controllers\Admin\AdminOverViewController;
use App\Http\Controllers\Branch\BranchMessageController;
use App\Http\Controllers\Branch\BranchReviewController;
use App\Http\Controllers\Branch\BranchRideController;
use App\Http\Controllers\Branch\BranchStationController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\UserStationController;
use App\Http\Controllers\UserRideController;
use App\Http\Controllers\PassengerMessageController;
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
        Route::post('logout', [UserController::class, 'logout']);
    });
});
Route::middleware('jwt.auth')->group(function () {
    Route::middleware('role:Passenger')->group(function () {
        Route::post('logout', [UserController::class, 'logout']);
        Route::post('reviews', [BranchReviewController::class, 'store']);
        Route::post('reviews', [BranchReviewController::class, 'store']);
        Route::get('refresh', [UserController::class, 'refresh']);
        Route::get('passengermessages', [PassengerMessageController::class, 'index']);
        Route::post('passengermessages', [PassengerMessageController::class, 'store']);
    });
});
Route::middleware('jwt.auth')->group(function () {
    Route::middleware('role:Admin')->group(function () {
        Route::get('overview', [AdminOverViewController::class, 'index']);
        Route::post('logout', [UserController::class, 'logout']);
        Route::get('coinrequests', [AdminCoinRequestController::class, 'index']);
        Route::put('coinrequests/{id}', [AdminCoinRequestController::class, 'update']);
        Route::delete('coinrequests/{id}', [AdminCoinRequestController::class, 'destroy']);
        Route::get('branches', [AdminBranchController::class, 'index']);
        Route::put('branches/{id}', [AdminBranchController::class, 'update']);
        Route::delete('branches/{id}', [AdminBranchController::class, 'destroy']);
        Route::post('email', [AdminBranchController::class, 'store']);
    });
});

Route::middleware('guest')->group(function () {
    Route::post('registerbranch', [AdminBranchController::class, 'create_branch']);
    Route::post('register', [UserController::class, "register"])->name('register');
    Route::post('login', [UserController::class, "login"])->name('login');
    Route::get('view_stations', [UserStationController::class, "view_stations"]);
    Route::get('view_nearest_stations', [UserStationController::class, "view_nearest_stations"]);
    Route::get('view_highest_rating_stations', [UserStationController::class, "view_highest_rating_stations"]);
    Route::get('view_station_rides/{station_id}', [UserRideController::class, "view_station_rides"]);
});
