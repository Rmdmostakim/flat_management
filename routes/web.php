<?php

use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return view('index');
});

Route::get('{AnyRoute}',function(){
    return view('index');
})->name('AnyRoute','.*');

Route::get('/{AnyRoute}/{url}',function(){
    return view('index');
})->name('AnyRoute','.*');

Route::get('/{AnyRoute}/{firstUrl}/{secondUrl}',function(){
    return view('index');
})->name('AnyRoute','.*');
