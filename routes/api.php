<?php

use Illuminate\Support\Facades\Route;
use Illuminate\Http\Request;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\Welcome;
use App\Http\Controllers\PostController;




Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

Route::middleware('auth:sanctum')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/me', [AuthController::class, 'me']);
    
    // Comments
    Route::post('/posts/{post}/comments', [\App\Http\Controllers\Api\CommentController::class, 'store']);
});

Route::get('/posts/{post}/comments', [\App\Http\Controllers\Api\CommentController::class, 'index']);
Route::apiResource('posts', PostController::class);
