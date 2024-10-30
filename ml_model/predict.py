import sys
import json
import numpy as np
import tensorflow as tf
from tensorflow.keras.preprocessing import image
import os

os.environ['TF_CPP_MIN_LOG_LEVEL'] = '3'  # Only show error messages

# Load the trained model
MODEL_PATH = '/home/bhoomi/Desktop/green/ml_model/model/diy_model.h5'
model = tf.keras.models.load_model(MODEL_PATH)

# Load class indices
class_indices_path = '/home/bhoomi/Desktop/green/ml_model/class_indices.json'
with open(class_indices_path, 'r') as json_file:
    class_indices = json.load(json_file)

# Image preprocessing function
def preprocess_image(img_path):
    img = image.load_img(img_path, target_size=(150, 150))  # Resize image
    img_array = image.img_to_array(img)  # Convert to array
    img_array = np.expand_dims(img_array, axis=0)  # Add batch dimension
    img_array /= 255.0  # Normalize
    return img_array

# Prediction function with full instructions and YouTube links for 20 items
def predict_image(img_path, threshold=0.5):
    img_array = preprocess_image(img_path)
    predictions = model.predict(img_array)
    class_idx = np.argmax(predictions, axis=1)[0]
    class_label = list(class_indices.keys())[class_idx]  # Use loaded class indices

    # Default instructions and YouTube link
    instructions = "No specific instructions for this item."
    youtube_link = None

    # Full set of instructions and YouTube links for 20 items
    if predictions[0][class_idx] > threshold:
        if class_label == "Plastic_Bottle":
            instructions = """
            1. Clean and Dry: Thoroughly wash and dry the plastic bottle.
            2. Cut Feeding Ports: Mark two or three openings.
            3. Create Perches: Cut two small holes, opposite each other.
            """
            youtube_link = "https://www.youtube.com/watch?v=IOb0R7tObD0"
        
        elif class_label == "Paper":
            instructions = """
            1. Roll up newspaper sheets tightly.
            2. Wrap in plastic wrap to form a cylinder.
            3. Water the newspaper for a reusable pot.
            """
            youtube_link = "https://www.youtube.com/watch?v=1btGx9yMgpk"
        
        elif class_label == "Metal_Can":
            instructions = """
            1. Clean and Dry: Wash and dry the metal can.
            2. Drill small holes at the bottom.
            3. Optionally, paint the can.
            """
            youtube_link = "https://www.youtube.com/watch?v=P2spjMjbZqE"
        
        elif class_label == "Glass_Jar":
            instructions = """
            1. Clean thoroughly.
            2. Decorate with paint or stickers.
            3. Use as a storage or candle holder.
            """
            youtube_link = "https://www.youtube.com/watch?v=cO6xXSgJcD0"
        
        elif class_label == "Cardboard_Box":
            instructions = """
            1. Flatten the box.
            2. Cut to desired shapes for crafts.
            3. Use as storage or DIY shelves.
            """
            youtube_link = "https://www.youtube.com/watch?v=Jk1T_I5LQ8g"
        
        elif class_label == "Plastic_Bag":
            instructions = """
            1. Cut handles and bottom.
            2. Use strips for weaving or stuffing.
            3. Make eco-friendly plastic bag yarn.
            """
            youtube_link = "https://www.youtube.com/watch?v=fXa9uFPw5RU"
        
        elif class_label == "Tin_Foil":
            instructions = """
            1. Flatten and clean.
            2. Use in art projects or as a reflector.
            3. Reuse for wrapping food items.
            """
            youtube_link = "https://www.youtube.com/watch?v=zg_9tu4ml1U"
        
        elif class_label == "Milk_Carton":
            instructions = """
            1. Rinse and dry.
            2. Cut out one side to create a container.
            3. Paint and use as a planter or storage.
            """
            youtube_link = "https://www.youtube.com/watch?v=sWXzZVvMpsU"
        
        elif class_label == "Shoe_Box":
            instructions = """
            1. Decorate with paint or paper.
            2. Use for storage or as a DIY organizer.
            3. Turn into a mini diorama.
            """
            youtube_link = "https://www.youtube.com/watch?v=eZr41D8XsUI"
        
        elif class_label == "Wine_Cork":
            instructions = """
            1. Collect several corks.
            2. Create coasters or bulletin boards.
            3. Use as plant markers.
            """
            youtube_link = "https://www.youtube.com/watch?v=6Dnt5gETcLs"
        
        elif class_label == "Plastic_Container":
            instructions = """
            1. Clean and dry the container.
            2. Cut out a section to create a planter.
            3. Decorate or label for plant type.
            """
            youtube_link = "https://www.youtube.com/watch?v=IOb0R7tObD0"
        
        elif class_label == "Egg_Carton":
            instructions = """
            1. Cut into sections.
            2. Use as seed starters.
            3. Place soil and seeds in each section.
            """
            youtube_link = "https://www.youtube.com/watch?v=aJ8vRF3iQ7A"
        
        elif class_label == "Pill_Bottle":
            instructions = """
            1. Remove label and clean.
            2. Use as small storage for pins or beads.
            3. Decorate as needed.
            """
            youtube_link = "https://www.youtube.com/watch?v=4zWx_pUUrXo"
        
        elif class_label == "Clothing":
            instructions = """
            1. Cut into strips for weaving projects.
            2. Use as rags or stuffing.
            3. Make DIY tote bags.
            """
            youtube_link = "https://www.youtube.com/watch?v=5fStIQuH5KU"
        
        elif class_label == "Toilet_Paper_Roll":
            instructions = """
            1. Decorate as needed.
            2. Use as seed starters.
            3. Fill with soil and plant seeds.
            """
            youtube_link = "https://www.youtube.com/watch?v=2Ofc9krxwJ8"
        
        elif class_label == "Magazine":
            instructions = """
            1. Roll pages for DIY wall art.
            2. Use cutouts for collage projects.
            3. Make beads by rolling and gluing.
            """
            youtube_link = "https://www.youtube.com/watch?v=ZgXFNzMfLGk"
        
        elif class_label == "Battery":
            instructions = """
            1. Do not DIY. Dispose of properly.
            """
            youtube_link = "https://www.youtube.com/watch?v=fTzRWR4Jzj4"
        
        elif class_label == "CD_DVD":
            instructions = """
            1. Clean and dry.
            2. Use for decor by painting or stacking.
            """
            youtube_link = "https://www.youtube.com/watch?v=J6bFocPMzVU"
        
        elif class_label == "Glass_Bottle":
            instructions = """
            1. Clean and dry.
            2. Decorate and use as vase.
            """
            youtube_link = "https://www.youtube.com/watch?v=b08cZyZT8Fg"
        
        elif class_label == "Styrofoam":
            instructions = """
            1. Paint and use for lightweight decor.
            """
            youtube_link = "https://www.youtube.com/watch?v=7A7GVB9HQ04"
        
    return class_label, instructions.strip(), youtube_link 

# Main function
if __name__ == "__main__":
    if len(sys.argv) < 2:
        print("Usage: python3 predict.py <image_path>")
        sys.exit(1)

    img_path = sys.argv[1]
    class_label, output, youtube_link = predict_image(img_path)
    print(json.dumps({"class": class_label, "instructions": output, "youtube_link": youtube_link}))
