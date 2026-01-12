const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'components', 'workflow', 'archimate-nodes.tsx');
let content = fs.readFileSync(filePath, 'utf8');

// Pattern to match node components that need fixing
// Matches: const width = data.width || [number]
// Matches: const height = data.height || [number]
// Matches: style={{ width, height }}
// Matches: className="w-full h-full ...

let fixCount = 0;

// Function to fix a single node component
function fixNode(match, exportLine, nodeName, params, widthLine, heightLine, otherVars, outerDivStart, styleValue, restOfOuterDiv, nodeResizerBlock, innerDivStart, innerClassName, innerStyleStart, innerStyleContent, restOfInnerDiv) {
  fixCount++;

  // Extract the width and height default values
  const widthMatch = widthLine.match(/data\.width \|\| (\d+)/);
  const heightMatch = heightLine.match(/data\.height \|\| (\d+)/);
  const defaultWidth = widthMatch ? widthMatch[1] : '100';
  const defaultHeight = heightMatch ? heightMatch[1] : '60';

  // Remove w-full h-full from className
  const fixedInnerClassName = innerClassName.replace(/\s*w-full\s*/g, '').replace(/\s*h-full\s*/g, '');

  // Update inner style to include minWidth and minHeight
  let fixedInnerStyle = innerStyleStart;
  if (innerStyleContent.trim().endsWith(',')) {
    fixedInnerStyle += `${innerStyleContent}\n          minWidth: ${defaultWidth},\n          minHeight: ${defaultHeight},`;
  } else if (innerStyleContent.trim()) {
    fixedInnerStyle += `${innerStyleContent},\n          minWidth: ${defaultWidth},\n          minHeight: ${defaultHeight},`;
  } else {
    fixedInnerStyle += `\n          minWidth: ${defaultWidth},\n          minHeight: ${defaultHeight},`;
  }

  // Build the fixed node
  const fixed = `${exportLine}({ ${params} }) => {
${otherVars}
  return (
    <div className="relative" style={{ padding: 10 }}>
${nodeResizerBlock}
      <div
        className="${fixedInnerClassName}"
        ${fixedInnerStyle}
        }}
      ${restOfInnerDiv}`;

  return fixed;
}

// More comprehensive pattern that captures the entire node structure
const nodePattern = /(export const \w+Node = memo\(\(\{ )([^}]+)( \}\: NodeProps\) => \{)\s*const width = (data\.width \|\| \d+)\s*const height = (data\.height \|\| \d+)\s*((?:.*\n)*?)\s*(return \(\s*<div className="relative" )style=\{\{ width, height \}\}(>)\s*((?:.*\n)*?      )(<div\s+className=")((?:.*?w-full.*?h-full.*?|.*?h-full.*?w-full.*?))("\s+style=\{\{)((?:.*?\n)*?)(        \}\})/gm;

// This won't work perfectly due to the complexity. Let me use a different approach.
// Let me read the file and process it line by line with state machine

const lines = content.split('\n');
const output = [];
let i = 0;
let nodesPrevented = [
  'BusinessActorNode',
  'BusinessProcessNode',
  'BusinessServiceNode',
  'BusinessObjectNode'
]; // Already fixed

while (i < lines.length) {
  const line = lines[i];

  // Check if this is the start of a node component
  const nodeMatch = line.match(/^export const (\w+Node) = memo\(\(\{ (.*?) \}\: NodeProps\) =&gt; \{/);

  if (nodeMatch && !nodesPrevented.includes(nodeMatch[1])) {
    const nodeName = nodeMatch[1];
    console.log(`Processing ${nodeName}...`);

    output.push(line); // export line
    i++;

    // Look for width and height const declarations
    let widthDefault = '100';
    let heightDefault = '60';
    let hasWidthHeight = false;
    let otherLines = [];

    while (i < lines.length && !lines[i].includes('return (')) {
      const widthMatch = lines[i].match(/const width = data\.width \|\| (\d+)/);
      const heightMatch = lines[i].match(/const height = data\.height \|\| (\d+)/);

      if (widthMatch) {
        widthDefault = widthMatch[1];
        hasWidthHeight = true;
        // Skip this line
      } else if (heightMatch) {
        heightDefault = heightMatch[1];
        hasWidthHeight = true;
        // Skip this line
      } else {
        otherLines.push(lines[i]);
      }
      i++;
    }

    if (hasWidthHeight) {
      fixCount++;
      // Output the other variable declarations
      otherLines.forEach(l => output.push(l));

      // Output the return line
      output.push(lines[i]); // return (
      i++;

      // Find and fix the outer div with style={{ width, height }}
      if (lines[i].includes('style={{ width, height }}')) {
        output.push(lines[i].replace('style={{ width, height }}', 'style={{ padding: 10 }}'));
        i++;
      } else {
        output.push(lines[i]);
        i++;
      }

      // Process remaining lines, looking for the inner div with w-full h-full
      let foundInnerDiv = false;
      while (i < lines.length && !lines[i].includes('})')) {
        let line = lines[i];

        // Check for the inner div with w-full h-full
        if (!foundInnerDiv && line.includes('className=') && (line.includes('w-full') || line.includes('h-full'))) {
          // Remove w-full and h-full
          line = line.replace(/\s*w-full\s*/g, ' ').replace(/\s*h-full\s*/g, ' ');
          line = line.replace(/className="\s+/g, 'className="').replace(/\s+"/g, '"');
          output.push(line);
          i++;

          // Now look for the style block
          if (lines[i].includes('style={{')) {
            output.push(lines[i]);
            i++;

            // Add minWidth and minHeight before the closing }}
            while (i < lines.length && !lines[i].includes('}}')) {
              output.push(lines[i]);
              i++;
            }

            // Insert minWidth and minHeight before }}
            if (lines[i].includes('}}')) {
              const indentation = lines[i].match(/^(\s*)/)[1];
              output.push(`${indentation}  minWidth: ${widthDefault},`);
              output.push(`${indentation}  minHeight: ${heightDefault},`);
              output.push(lines[i]);
              i++;
            }
          } else {
            // No style block after className, continue
          }

          foundInnerDiv = true;
        } else {
          output.push(line);
          i++;
        }
      }
    } else {
      // No width/height to fix, just copy the rest
      otherLines.forEach(l => output.push(l));
      output.push(lines[i]); // return (
      i++;
    }
  } else {
    output.push(line);
    i++;
  }
}

if (fixCount > 0) {
  fs.writeFileSync(filePath, output.join('\n'), 'utf8');
  console.log(`\n✓ Fixed ${fixCount} node components!`);
} else {
  console.log('No nodes needed fixing.');
}
