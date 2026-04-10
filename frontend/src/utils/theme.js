export const getTheme = (dk) => ({
  bg:        dk ? "bg-[#0f110f]"                          : "bg-[#F7F8E5]",
  card:      dk ? "bg-[#1a1f1a] border-[#2e382e]"         : "bg-white border-[#ECEFD2]",
  title:     dk ? "text-[#F7F8E5]"                        : "text-[#020202]",
  text:      dk ? "text-[#9a9890]"                        : "text-[#6D6A61]",
  input:     dk
    ? "bg-[#0f110f] border-[#2e382e] text-[#F7F8E5] placeholder-[#6D6A61] focus:border-[#F7F8E5]"
    : "bg-white border-[#ECEFD2] text-[#020202] placeholder-[#6D6A61] focus:border-[#232D23]",
  button:    dk ? "bg-[#F7F8E5] text-[#232D23]"           : "bg-[#232D23] text-[#F7F8E5]",
  overlay:   dk ? "bg-[#1a1f1a] border-[#2e382e]"         : "bg-white border-[#ECEFD2]",
  border:    dk ? "border-[#2e382e]"                      : "border-[#ECEFD2]",
  editBtn:   dk ? "bg-[#232D23] text-[#F7F8E5] border-[#2e382e]" : "bg-[#ECEFD2] text-[#232D23] border-[#ECEFD2]",
  hoverRow:  dk ? "border-[#1a1f1a] hover:bg-[#232D23]"  : "border-[#F7F8E5] hover:bg-[#F7F8E5]",
  cancelBtn: dk ? "border-[#2e382e] text-[#9a9890]"       : "border-[#ECEFD2] text-[#6D6A61]",
  statusActive:   dk ? "bg-[#1a2e1a] text-[#7acc7a]"     : "bg-[#dff0df] text-[#1a4a1a]",
  statusInactive: dk ? "bg-[#2e1a1a] text-[#cc7a7a]"     : "bg-[#f5dede] text-[#6a1a1a]",
});