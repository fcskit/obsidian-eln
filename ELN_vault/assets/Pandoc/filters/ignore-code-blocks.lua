function CodeBlock(block)
  if block.classes:includes("ignore") then
    return pandoc.RawBlock('markdown', '')
  else
    return block
  end
end