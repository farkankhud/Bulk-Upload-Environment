using CatalogService as service from '../../srv/interactions_srv';

annotate service.ERROR_LOG1 with @(
    UI.FieldGroup #GeneratedGroup1 : {
        $Type : 'UI.FieldGroupType',
        Data : [
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
                Label : 'KPI',
                Value : KPI,
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
            {
                $Type : 'UI.DataField',
                Label : 'ERROR_MSG',
                Value : ERROR_MSG,
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
