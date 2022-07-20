<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Payment;
use App\Models\Tenant;
use App\Models\House;
use App\Models\Business;
use App\Models\Flat;

class PaymentController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request,$tenantId){
        $validated = $request->validate(['date'=>'bail|required|date']);

        $inputMonth = date_format(date_create($validated['date']),"m");
        $inputYear  = date_format(date_create($validated['date']),"Y");
        $prePayment = Payment::where('tenant_id',$tenantId)->latest()->first();
        $currentPayment = Payment::where('tenant_id',$tenantId)
                            ->whereMonth('created_at', $inputMonth)
                            ->whereYear('created_at', $inputYear)
                            ->first();

        $tenant = Tenant::where('id',$tenantId)->with('payment')->first();
        $flat = Flat::where('id',$tenant->flat_id)->with('house')->first();

        if($currentPayment == null){
            if($tenant->billing_type == 1){
                $settings = Business::where('flat_id',$tenant->flat_id)->first();
            }else{
                $settings = Business::where('house_id',$flat->house_id)->first();
            }
            return response()->json(['status'=>200,'paid'=>false,'tenant'=>$tenant,'flat'=>$flat,'settings'=>$settings,
                'prePayment'=>$prePayment]);
        }

        return response()->json(['status'=>200,'paid'=>true,'tenant'=>$tenant,'flat'=>$flat,'currentPayment'=>$currentPayment,
            'prePayment'=>$prePayment]);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request):object{
        $validated = $request->validate([
            'tenant_id'=>'bail|numeric|min:1',
            'gas'=>'bail|numeric|min:0',
            'water'=>'bail|numeric|min:0',
            'electricity'=>'bail|numeric|min:0',
            'meter_reading'=>'bail|numeric|min:0',
            'garbage'=>'bail|numeric|min:0',
            'security'=>'bail|numeric|min:0',
            'internet'=>'bail|numeric|min:0',
            'dish_antenna'=>'bail|numeric|min:0',
            'service'=>'bail|numeric|min:0',
            'others'=>'bail|numeric|min:0',
            'rent'=>'bail|numeric|min:1',
            'due'=>'bail|numeric|min:0',
            'paid'=>'bail|numeric|min:1',
            'total'=>'bail|numeric|min:1',
        ]);

        $deletePreDue = Payment::where('tenant_id',$validated['tenant_id'])->update(['due'=>0]);
        $payment = Payment::create([
            'tenant_id'=>$validated['tenant_id'],
            'gas'=>$validated['gas'],
            'water'=>$validated['water'],
            'electricity'=>$validated['electricity'],
            'meter_reading'=>$validated['meter_reading'],
            'garbage'=>$validated['garbage'],
            'security'=>$validated['security'],
            'internet'=>$validated['internet'],
            'dish_antenna'=>$validated['dish_antenna'],
            'service'=>$validated['service'],
            'others'=>$validated['others'],
            'rent'=>$validated['rent'],
            'total'=>$validated['total'],
            'paid'=>$validated['paid'],
            'due'=> $validated['due'],
        ]);
        if($payment){
            $phone = $tenant = Tenant::where('id',$validated['tenant_id'])->pluck('phone');
            $msg = 'total bill'.$validated['paid'].' tk';
            if($this->notification($phone,$msg)){
                return response()->json(['status'=>200,'message'=>'Payment confirmed']);
            }
        }
        return response()->json(['status'=>400,'message'=>'Payment failed']);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id):object{
        $tenants = Tenant::where('id',$id)->with('flat')->first();
        $house = House::where('id',Tenant::find($id)->flat->house_id)->first();
        $due   = Payment::where('tenant_id',$id)->sum('due');
        $bills  = Business::where('house_id',$house->id)->get();

        return response()->json(['status'=>200,'tenants'=>$tenants,'house'=>$house,'bills'=>$bills,'due'=>$due]);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }

    public function notification($phone,$msg){

        $params = [
            "msisdn" => $phone,
            "sms" => $msg,
            "sid" => 'Mostakim'
        ];

        $params = json_encode($params);
        $ch = curl_init();
        curl_setopt($ch, CURLOPT_URL, "https://deshcollection.com/sms/load_bulk_sms_ecommerce.php");
        curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, FALSE);
        curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, 2);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_CUSTOMREQUEST, "POST");
        curl_setopt($ch, CURLOPT_POSTFIELDS, $params);
        curl_setopt($ch, CURLOPT_HTTPHEADER, array(
            'Content-Type: application/json',
            'Content-Length: ' . strlen($params),
            'accept:application/json'
        ));

        $response = curl_exec($ch);
        curl_close($ch);

        if($response){
            return true;
        }
        return false;
    }
}
