<?php

namespace App\Providers;

use App\Http\Controllers\RandomTokenController;
use App\Models\Parametre;
use Artisaninweb\SoapWrapper\Extension\SoapService;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        $langues = Parametre::where('nom_liste', 'langues')->get();
        //SoapService::useController(RandomTokenController::class);
    }
}
