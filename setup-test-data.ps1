# Complete Setup for Grandchild Entries Testing
$BASE = "http://localhost:8080/api/v1"
$orgId = "f820dee2-92e0-49bc-af11-3ae68e085a8f"

Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "Setting up Grandchild Entries Test Data" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

try {
    # 1. Get Business Model Canvas framework
    Write-Host "1. Getting Business Model Canvas framework..." -ForegroundColor Yellow
    $frameworks = (Invoke-RestMethod -Uri "$BASE/frameworks").data
    $bmcFramework = $frameworks | Where-Object { $_.slug -eq "business-model-canvas" }
    
    if (-not $bmcFramework) {
        Write-Host "   Business Model Canvas not found, using first framework" -ForegroundColor Yellow
        $bmcFramework = $frameworks[0]
    }
    
    Write-Host "   Framework: $($bmcFramework.name) (ID: $($bmcFramework.id))" -ForegroundColor Green
    
    # 2. Create Key Partners grandchild if it doesn''t exist
    Write-Host ""
    Write-Host "2. Setting up Key Partners section..." -ForegroundColor Yellow
    $grandchildren = (Invoke-RestMethod -Uri "$BASE/frameworks/$($bmcFramework.slug)/grandchildren").data
    $keyPartnersGC = $grandchildren | Where-Object { $_.slug -eq "key-partners" }
    
    if (-not $keyPartnersGC) {
        Write-Host "   Creating Key Partners section..." -ForegroundColor Gray
        $gcBody = @{
            frameworkId = $bmcFramework.id
            name = "Key Partners"
            slug = "key-partners"
            order = 1
        } | ConvertTo-Json
        $keyPartnersGC = (Invoke-RestMethod -Uri "$BASE/frameworks/$($bmcFramework.slug)/grandchildren" -Method Post -Body $gcBody -ContentType "application/json").data
    }
    Write-Host "   Key Partners ID: $($keyPartnersGC.id)" -ForegroundColor Green
    
    # 3. Create Project
    Write-Host ""
    Write-Host "3. Creating project..." -ForegroundColor Yellow
    $projectBody = @{
        organizationId = $orgId
        name = "Product Launch Canvas"
        description = "Business Model Canvas for new product launch"
        status = "active"
    } | ConvertTo-Json
    $project = (Invoke-RestMethod -Uri "$BASE/projects" -Method Post -Body $projectBody -ContentType "application/json").data
    Write-Host "   Project: $($project.name) (ID: $($project.id))" -ForegroundColor Green
    
    # 4. Create Framework Instance
    Write-Host ""
    Write-Host "4. Creating framework instance..." -ForegroundColor Yellow
    $instanceBody = @{
        projectId = $project.id
        frameworkId = $bmcFramework.id
        organizationId = $orgId
        name = "Product Launch BMC"
        status = "draft"
    } | ConvertTo-Json
    $instance = (Invoke-RestMethod -Uri "$BASE/framework-instances" -Method Post -Body $instanceBody -ContentType "application/json").data
    Write-Host "   Instance: $($instance.name) (ID: $($instance.id))" -ForegroundColor Green
    
    # 5. Create sample grandchild entries
    Write-Host ""
    Write-Host "5. Creating sample entries..." -ForegroundColor Yellow
    
    $partners = @(
        @{ title = "Manufacturing Partner A"; description = "Primary supplier for components"; metadata = @{ type = "supplier"; priority = "high" }}
        @{ title = "Technology Provider B"; description = "Cloud infrastructure partner"; metadata = @{ type = "tech-partner"; priority = "medium" }}
        @{ title = "Distribution Partner C"; description = "Logistics and distribution"; metadata = @{ type = "distributor"; priority = "high" }}
    )
    
    $createdEntries = @()
    $i = 1
    foreach ($partner in $partners) {
        $entryBody = @{
            frameworkInstanceId = $instance.id
            grandchildId = $keyPartnersGC.id
            title = $partner.title
            description = $partner.description
            orderIndex = $i
            metadata = $partner.metadata
        } | ConvertTo-Json -Depth 10
        
        $entry = (Invoke-RestMethod -Uri "$BASE/grandchild-entries" -Method Post -Body $entryBody -ContentType "application/json").data
        $createdEntries += $entry
        Write-Host "   Created: $($entry.title) (ID: $($entry.id))" -ForegroundColor Green
        $i++
    }
    
    Write-Host ""
    Write-Host "========================================" -ForegroundColor Cyan
    Write-Host "Setup Complete!" -ForegroundColor Green
    Write-Host "========================================" -ForegroundColor Cyan
    Write-Host ""
    Write-Host "Test URLs:" -ForegroundColor Yellow
    Write-Host "  Framework Instance: http://localhost:3000/frameworks/$($bmcFramework.slug)/dashboard?instance=$($instance.id)" -ForegroundColor White
    Write-Host "  Key Partners Page: http://localhost:3000/frameworks/$($bmcFramework.slug)/key-partners?instance=$($instance.id)" -ForegroundColor White
    Write-Host ""
    Write-Host "Created Data:" -ForegroundColor Yellow
    Write-Host "  Framework: $($bmcFramework.name)" -ForegroundColor Gray
    Write-Host "  Project: $($project.name)" -ForegroundColor Gray
    Write-Host "  Instance: $($instance.name)" -ForegroundColor Gray
    Write-Host "  Entries: $($createdEntries.Count) partners" -ForegroundColor Gray
    Write-Host ""
    
    # Save IDs for reference
    $setup = @{
        frameworkSlug = $bmcFramework.slug
        frameworkId = $bmcFramework.id
        grandchildId = $keyPartnersGC.id
        projectId = $project.id
        instanceId = $instance.id
        entries = $createdEntries | ForEach-Object { @{ id = $_.id; title = $_.title }}
    }
    
    $setup | ConvertTo-Json -Depth 10 | Out-File "C:\shadcn-examples\test-data-setup.json"
    Write-Host "Setup data saved to: test-data-setup.json" -ForegroundColor Gray
    Write-Host ""
    
} catch {
    Write-Host ""
    Write-Host "Setup failed: $_" -ForegroundColor Red
    exit 1
}
