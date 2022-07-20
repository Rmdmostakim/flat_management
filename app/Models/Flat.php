<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Flat extends Model
{
    use HasFactory;
    protected $fillable = [
        'flat_name',
        'size',
        'house_id',
        'booked',
        'status',
    ];

    protected $attributes = [
        'booked' => 0,
        'status'=>1,
    ];

    public function house(){
        return $this->belongsTo(House::class);
    }
    public function tenant(){
        return $this->hasOne(Tenant::class);
    }
}
