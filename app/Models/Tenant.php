<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Tenant extends Model
{
    use HasFactory;
    protected $fillable = [
        'first_name',
        'last_name',
        'email',
        'phone',
        'flat_id',
        'rent',
        'rent_start_date',
        'billing_type',
        'status',
    ];

    protected $attributes = [
        'rent_end_date' => null,
        'status'=>1,
    ];

    public function flat(){
        return $this->belongsTo(Flat::class);
    }

    public function payment(){
        return $this->hasOne(Payment::class);
    }
}
