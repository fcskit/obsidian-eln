function Inlines(inlines)
  local result = pandoc.List()
  local i = 1

  while i <= #inlines do
    local el = inlines[i]

    if el.t == "RawInline" and el.format == "html" then
      if el.text == "<sub>" then
        local content = pandoc.List()
        i = i + 1
        while i <= #inlines and not (inlines[i].t == "RawInline" and inlines[i].format == "html" and inlines[i].text == "</sub>") do
          content:insert(inlines[i])
          i = i + 1
        end
        result:insert(pandoc.Subscript(content))
      elseif el.text == "<sup>" then
        local content = pandoc.List()
        i = i + 1
        while i <= #inlines and not (inlines[i].t == "RawInline" and inlines[i].format == "html" and inlines[i].text == "</sup>") do
          content:insert(inlines[i])
          i = i + 1
        end
        result:insert(pandoc.Superscript(content))
      else
        result:insert(el)
      end
    else
      result:insert(el)
    end

    i = i + 1
  end

  return result
end

return {
  { Inlines = Inlines }
}