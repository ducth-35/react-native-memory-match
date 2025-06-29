// Manual test for responsive calculations
// Run with: node test-responsive.js

function testResponsiveCalculations() {
  console.log('🧪 Testing Responsive Calculations\n');

  // Test different screen widths
  const screenWidths = [
    { width: 360, name: 'Phone (Small)' },
    { width: 414, name: 'Phone (Large)' },
    { width: 768, name: '7" Tablet (Portrait)' },
    { width: 1024, name: '7" Tablet (Landscape) / 10" Portrait' },
    { width: 1200, name: '10" Tablet (Landscape)' },
    { width: 1366, name: '12" Tablet' },
  ];

  const gridSizes = [
    { size: 16, cols: 4, name: '4x4 Easy' },
    { size: 20, cols: 5, name: '4x5 Medium' },
    { size: 30, cols: 6, name: '5x6 Hard' },
  ];

  function calculateResponsive(screenWidth, gridSize, cols) {
    // Same logic as in responsiveUtils.ts
    let padding = 20;
    if (screenWidth >= 1200) padding = 60;
    else if (screenWidth >= 800) padding = 40;
    else if (screenWidth >= 600) padding = 30;
    
    let spacing = 6;
    if (screenWidth >= 1200) spacing = 12;
    else if (screenWidth >= 800) spacing = 10;
    else if (screenWidth >= 600) spacing = 8;
    
    // For 6 columns (hard mode), reduce spacing to fit better
    if (cols === 6) {
      spacing = Math.max(4, spacing - 2);
      padding = Math.max(16, padding - 10);
    }
    
    // Calculate available space
    const availableWidth = screenWidth - (padding * 2);
    const totalSpacing = (cols - 1) * spacing;
    const availableForCards = availableWidth - totalSpacing;
    const calculatedCardSize = availableForCards / cols;
    
    // Set reasonable min/max limits
    const minCardSize = 45;
    const maxCardSize = 140;
    
    // Apply limits
    const finalCardSize = Math.max(
      minCardSize,
      Math.min(maxCardSize, calculatedCardSize)
    );
    
    // Calculate actual board dimensions
    const actualBoardWidth = finalCardSize * cols + spacing * (cols - 1);
    const excessSpace = screenWidth - actualBoardWidth - (padding * 2);
    const finalPadding = padding + Math.max(0, excessSpace / 2);
    
    return {
      cardSize: Math.round(finalCardSize),
      spacing: Math.round(spacing),
      padding: Math.round(finalPadding),
      actualBoardWidth: Math.round(actualBoardWidth),
      fits: actualBoardWidth <= (screenWidth - padding * 2),
      utilization: Math.round((actualBoardWidth / screenWidth) * 100),
    };
  }

  // Test all combinations
  screenWidths.forEach(screen => {
    console.log(`📱 ${screen.name} (${screen.width}px)`);
    console.log('─'.repeat(50));
    
    gridSizes.forEach(grid => {
      const result = calculateResponsive(screen.width, grid.size, grid.cols);
      const status = result.fits ? '✅' : '❌';
      
      console.log(`${status} ${grid.name}:`);
      console.log(`   Card: ${result.cardSize}px | Spacing: ${result.spacing}px | Padding: ${result.padding}px`);
      console.log(`   Board: ${result.actualBoardWidth}px | Screen: ${screen.width}px | Usage: ${result.utilization}%`);
      
      if (!result.fits) {
        const overflow = result.actualBoardWidth - (screen.width - result.padding * 2);
        console.log(`   ⚠️  Overflow: ${Math.round(overflow)}px`);
      }
      console.log('');
    });
    
    console.log('');
  });

  // Summary
  console.log('📊 SUMMARY');
  console.log('─'.repeat(50));
  
  let totalTests = 0;
  let passedTests = 0;
  
  screenWidths.forEach(screen => {
    gridSizes.forEach(grid => {
      totalTests++;
      const result = calculateResponsive(screen.width, grid.size, grid.cols);
      if (result.fits) passedTests++;
    });
  });
  
  console.log(`Total tests: ${totalTests}`);
  console.log(`Passed: ${passedTests} (${Math.round((passedTests/totalTests)*100)}%)`);
  console.log(`Failed: ${totalTests - passedTests}`);
  
  // Recommendations
  console.log('\n💡 RECOMMENDATIONS');
  console.log('─'.repeat(50));
  
  screenWidths.forEach(screen => {
    const results = gridSizes.map(grid => ({
      ...grid,
      ...calculateResponsive(screen.width, grid.size, grid.cols)
    }));
    
    const workingGrids = results.filter(r => r.fits).map(r => r.name);
    const problematicGrids = results.filter(r => !r.fits).map(r => r.name);
    
    console.log(`${screen.name}:`);
    if (workingGrids.length > 0) {
      console.log(`  ✅ Works well: ${workingGrids.join(', ')}`);
    }
    if (problematicGrids.length > 0) {
      console.log(`  ⚠️  Problematic: ${problematicGrids.join(', ')}`);
    }
    console.log('');
  });
}

// Run the test
testResponsiveCalculations();
