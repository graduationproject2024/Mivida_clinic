$ErrorActionPreference = "Continue"

Write-Output "--- LINT ---"
npm run lint

Write-Output "--- TYPE-CHECK ---"
npm run type-check

Write-Output "--- UNIT TESTS ---"
npm run test

Write-Output "--- BUILD ---"
npm run build

Write-Output "--- ACCESSIBILITY TESTS ---"
npm run test:accessibility

Write-Output "--- E2E TESTS ---"
npm run test:e2e

Write-Output "--- ALL BASELINE CHECKS COMPLETED ---"
