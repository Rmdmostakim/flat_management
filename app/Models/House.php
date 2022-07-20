<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class House extends Model
{
    use HasFactory;
    protected $fillable = [
        'house_name',
        'address',
        'user_id',
        'flat_numbers'
    ];

    protected $attributes = [
        'status'=>1,
    ];

    public function flats()
    {
        return $this->hasMany(Flat::class);
    }

    public function user(){
        return $this->belongsTo(Flat::class);
    }

    public function business(){
        return $this->hasOne(Business::class);
    }
}
