<?php

use App\Http\Controllers\AgendaController;
use App\Http\Controllers\Controller;
use App\Http\Controllers\Fiche03Controller;
use App\Http\Controllers\Fiche04Controller;
use App\Http\Controllers\Fiche05Controller;
use App\Http\Controllers\NotificationController;
use App\Models\Parametre;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
|
*/

Route::get('/', function () {
    return view('layout');
});


// Route::resource('/agenda', AgendaController::class);

Route::resource('/notification', NotificationController::class);

Route::prefix('fiche03')->group(function () {
    Route::get('/', [Fiche03Controller::class, 'create'])->name('fiche03.create');
    Route::post('/', [Fiche03Controller::class, 'store'])->name('fiche03.store');
    Route::get('/{id}/edit', [Fiche03Controller::class, 'edit'])->name('fiche03.edit');
    Route::patch('/{id}', [Fiche03Controller::class, 'update'])->name('fiche03.update');
});

Route::prefix('fiche04')->group(function () {
    Route::get('/', [Fiche04Controller::class, 'create'])->name('fiche04.create');
    Route::post('/', [Fiche04Controller::class, 'store'])->name('fiche04.store');
});

Route::prefix('fiche05')->group(function () {
    Route::get('/', [Fiche05Controller::class, 'create'])->name('fiche05.create');
    Route::post('/', [Fiche05Controller::class, 'store'])->name('fiche05.store');
});

// Route::get('/BDC', [Controller::class, 'etape1']);
