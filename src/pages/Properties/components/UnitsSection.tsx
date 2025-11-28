return (
    <Card className="mt-4">
      <CardHeader className="flex flex-row items-center justify-between gap-4">
        <div>
          <CardTitle>{property.name} - Units</CardTitle>
          <CardDescription>
            View occupancy, rent, and lease details for each unit.
          </CardDescription>
        </div>
        <Button size="sm" className="gap-2">
          <Plus className="h-4 w-4" />
          Add Unit
        </Button>
      </CardHeader>

      <CardContent>
        {property.units?.length === 0 ? (
          <p className="text-sm text-muted-foreground">
            No units found for this property yet.
          </p>
        ) : (
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {property.units?.map((unit) => (
              <UnitCard key={unit.id} unit={unit} />
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
