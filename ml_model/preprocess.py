from tensorflow.keras.preprocessing.image import ImageDataGenerator

def get_data_generators(image_size=(150, 150), batch_size=32):
    # Data augmentation and rescaling
    train_datagen = ImageDataGenerator(
        rescale=1.0 / 255,
        validation_split=0.2  # 80% training, 20% validation
    )

    # Training data generator
    train_generator = train_datagen.flow_from_directory(
        'dataset/training',
        target_size=image_size,
        batch_size=batch_size,
        class_mode='binary',
        subset='training'
    )

    # Validation data generator
    validation_generator = train_datagen.flow_from_directory(
        'dataset/training',
        target_size=image_size,
        batch_size=batch_size,
        class_mode='binary',
        subset='validation'
    )

    return train_generator, validation_generator
