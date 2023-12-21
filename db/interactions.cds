namespace app.interactions;
using { cuid } from '@sap/cds/common';
entity Employee {

  key  id:       Integer;
    Name:     String(50);
    Salary:    Decimal(15, 2);
    Location:  String(100);
    
}

entity Students  {
  key StudentId: String;
 FirstName: String;
 LastName: String;
 DOB: String;
 Address: String;
  
}

entity ERROR_LOG  {
 ERROR_CODE: String;
 ERROR_MSG: String;
}
entity HAZ_TRAN_3E {
KEY matnr: String(40);
mtart: String(40);
HAZ_FLAG: String(1);

}
entity Environment_Report  {
            key Industry             : String(100) not null;
            key Year                 : String(25);
            key Month                : String(14);
            key Location             : String(120);
            key Type                 : String(50);
            key SubType              : String(50);
            key KPI                  : String not null;
            key Sno                  : Integer;
            // key id                   : Association to LocationValues;
                // key supplier   : String(100);
                url                  : String;
                Value                : Decimal;
                Unit                 : String(20);
                IUnit                : String(8); // New field
                IValue               : Decimal; // New field
                Cost                 : Decimal;
                Currency             : String(10);
                Quality              : String(40);
                Comment              : String;
                // New fileds added for
            FiscalType           :String(1);// Boolean;
            YearA                : String(9);
            StartDate            : String(25);
            EndDate              : String(25);
            fiscal               : String(25);
            isValidationRequired : String(1);//Boolean;
            // End of addition
            // Type       : String(50);
            // SubType    : String(50);
            Owner                : String;
            Approver             : String;
            Division             : String;
            Value2               : Decimal;
            Unit2                : String(4);
            Distance             : Decimal;
            Weight               : Decimal;
            Scope                : String;
            Associates           : Integer;
            // Sno        : Integer;
            Date                 : Date;
            Logic                : String(15); //new field
            Measure              : String(70); //new field
            Standard1            : String; //new field
            LogicE               : String(20); //new field
            GRIStd               : String; //new field
            SDG                  : String(500); //new field
            Class                : String(50); //new field
            RenNon               : String; //new field added Reneable/non renewable
            // createdAt            : Timestamp  @cds.on.insert: $now;
            // modifiedAt           : Timestamp  @cds.on.insert: $now  @cds.on.update: $now;
            FValue               : Decimal;
            FValue1              : Decimal; //new field for energy emissions
    }

entity EmissionFactors {
        key Industry       : String(100) not null;
        key KPI            : String;
        key Type           : String;
        key SubType        : String;
        key Standard       : String;
        key Shortlong      : String;
        key class          : String;
            EmissionFactor : Decimal;
            UoM            : String;
            Deno           : String;
            Nume           : String; //new field added
            // createdAt      : Timestamp  @cds.on.insert: $now;
            // modifiedAt     : Timestamp  @cds.on.insert: $now  @cds.on.update: $now;

    }

     entity UoMConversions {
            // key Industry           : String(100) not null;
        key Measure            : String not null;
        key UserInputUnit      : String not null;
        key ExpectedOutputUnit : String not null;
            ConverstionFactor  : Decimal not null;
            Operation          : String not null;
            KPI                : String(100); //new field added
            Type               : String(100); //new field added
            Subtype            : String(100); //new field added
    // Energy             : String(70);//new field added

    }

     entity EnergyCnversions {

        key Industry           : String(100) not null;
        key KPI                : String(100); //new field added
        key Type               : String(100); //new field added
        key Subtype            : String(100); //new field added
            // Energy             : String(70);//new field added
        key UserInputUnit      : String not null;
            ExpectedOutputUnit : String not null;
            ConverstionFactor  : Decimal not null;
            Operation          : String not null;

    }

    entity KPIList {
        key Industry          : String(100) not null;
        key KPI               : String(100) not null;
        key Type              : String(100) not null;
        key SubType           : String(100) not null;
        key EnergyUse         : String(100);
            kpiconc           : String(100);
            // EnergyUse         : String(100);
            Supplier          : String(100);
            BiogenicEmissions : String(4);
            Template          : String;
            Measure           : String(50);
            // Standard          : String;
            EFStandard        : String;
            // Logic             : String;
            EmissionLogic     : String(50);
            Scope             : String;
            // Standard1         : String;
            ReportingStandard : String;
            // LogicE            : String(20);
            EnergyLogic       : String(20);
            GRIStd            : String;
            SDG               : String;
            RenNon            : String; //new field added Reneable/non renewable
    // createdAt      : Timestamp @cds.on.insert : $now;
    // modifiedAt : Timestamp  @cds.on.insert : $now   @cds.on.update : $now;
    }

 entity Year_Module {
            // key Year: String(25) not null;
            // key Vertical  : String(9) not null;
        key Industry  : String(100) not null;
        key YearL     : String(4);
        key fiscal    : String(25);
            YearR     : String(4);
            YearA     : String(9);
            StartDate : String(25);
            EndDate   : String(25);


    }

    entity Measure_Module {
        key Industry          : String(100) not null;
        key InputMeasureType  : String not null;
            InputUom          : String not null;
            OutputMeasureType : String not null;
            OutputUoM         : String not null;
            ConverstionFactor : Decimal not null;
            Operation         : String not null;

    }

   

    type tt_Environment {
        Industry             : String(100) not null;
         Year                 : String(25);
         Month                : String(14);
         Location             : String(120);
         Type                 : String(50);
         SubType              : String(50);
         KPI                  : String not null;
         Sno                  : Integer;
        // key id                   : Association to LocationValues;
            // key supplier   : String(100);
            url                  : String;
            Value                : Decimal;
            Unit                 : String(20);
            IUnit                : String(8); // New field
            IValue               : Decimal; // New field
            Cost                 : Decimal;
            Currency             : String(10);
            Quality              : String(40);
            Comment              : String;
            // New fileds added for
            FiscalType           : Boolean;
            YearA                : String(9);
            StartDate            : String(25);
            EndDate              : String(25);
            fiscal               : String(25);
            isValidationRequired : Boolean;
            // End of addition
            // Type       : String(50);
            // SubType    : String(50);
            Owner                : String;
            Approver             : String;
            Division             : String;
            Value2               : Decimal;
            Unit2                : String(4);
            Distance             : Decimal;
            Weight               : Decimal;
            Scope                : String;
            Associates           : Integer;
            // Sno        : Integer;
            Date                 : Date;
            Logic                : String(15); //new field
            Measure              : String(70); //new field
            Standard1            : String; //new field
            LogicE               : String(20); //new field
            GRIStd               : String; //new field
            SDG                  : String(500); //new field
            Class                : String(50); //new field
            RenNon               : String; //new field added Reneable/non renewable
            // createdAt            : Timestamp  @cds.on.insert: $now;
            // modifiedAt           : Timestamp  @cds.on.insert: $now  @cds.on.update: $now;
            FValue               : Decimal;
            FValue1              : Decimal; //new field for energy emissions
    };

