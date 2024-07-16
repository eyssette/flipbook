# Fichiers source
file_list = ["scripts/createFlipbook.js", "scripts/getData.js"]

# Fichier de sortie
combined_file = "script.min.js"

# Combiner les fichiers source
def combine_files(file_list, output_file):
	with open(output_file, 'w') as final_file:
		for file in file_list:
			with open(file, 'r') as f:
				content = f.read()
				final_file.write(content)
				final_file.write('\n')


combine_files(file_list, combined_file)