<?php

namespace App\Providers;

use Carbon\Carbon;
use Illuminate\Support\Facades\App;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     *
     * @return void
     */
    public function register()
    {
        $locale = $this->getLocale();
        setlocale(LC_TIME, $locale);
        Carbon::setLocale($locale);
        if ($locale !== \config('app.locale')) {
            \config(['app.locale' => $locale]);
        }
    }

    /**
     * Bootstrap any application services.
     *
     * @return void
     */
    public function boot()
    {
        Schema::defaultStringLength(191);
        date_default_timezone_set('America/Sao_Paulo');
    }

    protected function getLocale()
    {
        if (isset($_COOKIE['locale']) && is_dir(resource_path("lang/{$_COOKIE['locale']}"))) {
            return $_COOKIE['locale'];
        }
        setcookie('locale', $this->app->getLocale(), (time() + (30 * 24 * 3600)), '/');
        return $this->app->getLocale();
    }
}
