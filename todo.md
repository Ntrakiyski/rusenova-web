section whativebuild (in ml sections) has a switch case function for images with backgrounds. i like it. make sure the component under this function uses only this imgs if available for their cards, not using other implementation below. so that i have 2 sections in this component - on the left titlte, bullets orange circles, bullets text; on the right items with background, imgs with bg, percentage and text;  

mlsegmentanalysis section is not with the same width as the rest of the ml sections. i currently see it centered and not taking the full 1200px width. please fix 

mltechnical performance section is with a wrong ui. the left side of the section needs a divider under each item and the percentage to be 19px and bold. the right section should only have 2 items without bg or other elemetns. the items will have a title and a description. thats it. the items will be one under another. so the final layout of the sectio nis row1 - section title, row 2 - 2 col sections. col 1 is the left section and col 2 is the right section both 50% witdht. and the full section should be as the rest with 1200px max width taking full space 

mlsectionwithcards and mlsectionwithcardsandbullets should use the path to an image "/info-square.svg" for the 3 icons and apply bg as well. change the current implementation so that the mlprojects.ts have this data for each item - icon, bg, title, description. passing these to the component and making sure all is working properly. 

