<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::post('login', 'Api\LoginController')->middleware('cors')->name('login');
Route::post('register', 'Api\RegisterController')->middleware('cors')->name('register');
Route::post('recovery', 'Api\RecoveryPasswordController')->middleware('cors')->name('recovery');
Route::post('recovery/token', 'Api\UpdateUserPasswordByTokenController')->middleware('cors')->name('recovery.by.token')->where('token', '.*');
Route::post('logout', 'Api\LogoutController')->middleware('cors')->name('logout');

Route::group(['middleware' => ['auth_api', 'cors'], 'namespace' => 'Api\Authenticated'], static function () {
    Route::group(['prefix' => 'empresas', 'as' => 'empresas.', 'namespace' => 'Empresas'], static function () {
        Route::get('', 'BuscaTodasAsEmpresasController');
        Route::get('{id}', 'BuscaEmpresaController');
        Route::put('{id?}', 'AtualizaEmpresaController');
        Route::delete('{id}', 'DeletaEmpresaController');
    });

    Route::group(['prefix' => 'agendas', 'namespace' => 'Agendas'], static function () {
        Route::get('', 'BuscaTodasAAgendaController');
        Route::get('{id}', 'BuscaEventoController');
        Route::put('{id?}', 'AtualizaEventoController');
        Route::delete('{id}', 'DeletaEventoController');
    });

    Route::group(['prefix' => 'lembretes', 'namespace' => 'Lembretes'], static function () {
        Route::get('', 'BuscaTodosOsLembretesController');
        Route::get('{id}', 'BuscaLembreteController');
    });

    Route::group(['prefix' => 'dashboard', 'namespace' => 'Dashboard'], static function () {
        Route::get('', 'BuscaCompromissosDashboardController');
        Route::put('{compromissoId}', 'AtualizaCompromissoDashboardController');
    });
});
