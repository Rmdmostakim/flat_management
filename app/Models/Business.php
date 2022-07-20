<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Business extends Model
{
    use HasFactory;
    protected $fillable = [
        'gas_single',
        'gas_double',
        'electricity',
        'water',
        'garbage',
        'security',
        'internet',
        'dish_antenna',
        'service_charge',
        'others',
        'type',
        'house_id',
        'flat_id',
    ];

    public function house(){
        return $this->belongsTo(House::class);
    }
}
