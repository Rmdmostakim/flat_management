<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Payment extends Model
{
    use HasFactory;
    protected $fillable = [
        'tenant_id',
        'gas',
        'water',
        'electricity',
        'meter_reading',
        'garbage',
        'security',
        'internet',
        'dish_antenna',
        'service',
        'others',
        'rent',
        'due',
        'total',
        'paid',
    ];
}
