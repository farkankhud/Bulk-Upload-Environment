using CatalogService as service from '../../srv/interactions_srv';

annotate service.ERROR_LOG1 with @(
    UI.LineItem : [
        {
            $Type : 'UI.DataField',
            Label : 'Location',
            Value : Location,
        },
        {
            $Type : 'UI.DataField',
            Label : 'Division',
            Value : Division,
        },
        {
            $Type : 'UI.DataField',
            Label : 'Year',
            Value : Year,
        },
        {
            $Type : 'UI.DataField',
            Label : 'Month',
            Value : Month,
        },
        {
            $Type : 'UI.DataField',
            Label : 'Type',
            Value : Type,
        },
         {
            $Type : 'UI.DataField',
            Label : 'SubType',
            Value : SubType,
        },
         {
            $Type : 'UI.DataField',
            Label : 'Unit',
            Value : Unit,
        },
         {
            $Type : 'UI.DataField',
            Label : 'Value',
            Value : Value,
        },
         {
            $Type : 'UI.DataField',
            Label : 'Cost',
            Value : Cost,
        },
         {
            $Type : 'UI.DataField',
            Label : 'Currency',
            Value : Currency,
        },
         {
            $Type : 'UI.DataField',
            Label : 'Quality',
            Value : Quality,
        },
         {
            $Type : 'UI.DataField',
            Label : 'Comment',
            Value : Comment,
        },
    ]
);
annotate service.Students with @(
    UI.FieldGroup #GeneratedGroup1 : {
        $Type : 'UI.FieldGroupType',
        Data : [
            {
                $Type : 'UI.DataField',
                Label : 'StudentId',
                Value : StudentId,
            },
            {
                $Type : 'UI.DataField',
                Label : 'FirstName',
                Value : FirstName,
            },
            {
                $Type : 'UI.DataField',
                Label : 'LastName',
                Value : LastName,
            },
            {
                $Type : 'UI.DataField',
                Label : 'DOB',
                Value : DOB,
            },
            {
                $Type : 'UI.DataField',
                Label : 'Address',
                Value : Address,
            },
        ],
    },
    UI.Facets : [
        {
            $Type : 'UI.ReferenceFacet',
            ID : 'GeneratedFacet1',
            Label : 'General Information',
            Target : '@UI.FieldGroup#GeneratedGroup1',
        },
    ]
);
