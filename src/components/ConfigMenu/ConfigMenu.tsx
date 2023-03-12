import PopupModal from '@components/PopupModal';
import { ConfigInterface } from '@type/chat';
import React, { useState } from 'react';

const ConfigMenu = ({
  setIsModalOpen,
  config,
  setConfig,
}: {
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  config: ConfigInterface;
  setConfig: (config: ConfigInterface) => void;
}) => {
  const [_temperature, _setTemperature] = useState<number>(config.temperature);
  const [_presencePenalty, _setPresencePenalty] = useState<number>(
    config.presence_penalty
  );

  const handleConfirm = () => {
    setConfig({
      temperature: _temperature,
      presence_penalty: _presencePenalty,
    });
    setIsModalOpen(false);
  };

  return (
    <PopupModal
      title="Configuration"
      setIsModalOpen={setIsModalOpen}
      handleConfirm={handleConfirm}
    >
      <div className="p-6 border-b border-gray-200 dark:border-gray-600">
        <div>
          <label className="block text-sm  text-gray-900 dark:text-white">
            Temperature: {_temperature}
          </label>
          <input
            id="default-range"
            type="range"
            value={_temperature}
            onChange={(e) => {
              _setTemperature(Number(e.target.value));
            }}
            min={0}
            max={2}
            step={0.1}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
          />
          <div className="min-w-fit text-gray-500 dark:text-gray-300 text-xs mt-2">
            Default is 1. Avoid changing; advanced users only.
          </div>
          <div className="min-w-fit text-gray-500 dark:text-gray-300 text-sm mt-2">
            What sampling temperature to use, between 0 and 2. Higher values
            like 0.8 will make the output more random, while lower values like
            0.2 will make it more focused and deterministic.
          </div>
          <div className="min-w-fit text-gray-500 dark:text-gray-300 text-sm mt-2">
            If you want to make the output more random, you can try increasing
            the temperature. If you want to make the output more focused, you
            can try decreasing the temperature.
          </div>
        </div>
        <div className="mt-5 pt-5 border-t border-gray-500">
          <label className="block text-sm  text-gray-900 dark:text-white">
            Presence Penalty: {_presencePenalty}
          </label>
          <input
            id="default-range"
            type="range"
            value={_presencePenalty}
            onChange={(e) => {
              _setPresencePenalty(Number(e.target.value));
            }}
            min={-2}
            max={2}
            step={0.1}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
          />
          <div className="min-w-fit text-gray-500 dark:text-gray-300 text-xs mt-3">
            Default is 0. Avoid changing; advanced users only.
          </div>
          <div className="min-w-fit text-gray-500 dark:text-gray-300 text-sm mt-3">
            Number between -2.0 and 2.0. Positive values penalize new tokens
            based on whether they appear in the text so far, increasing the
            model's likelihood to talk about new topics.
          </div>
          <div className="min-w-fit text-gray-500 dark:text-gray-300 text-xs mt-3">
            Note: When adjusting the settings, only modify one parameter at a
            time.
          </div>
        </div>
        <div className="mt-5 pt-5 border-t border-gray-500">
          <h2 className="block text-lg  text-gray-900 dark:text-white">
            Maximizing Language Model Potential: Understanding Temperature and
            Presence Penalty
          </h2>
          <div className="min-w-fit text-gray-500 dark:text-gray-300 text-sm mt-3">
            In simple terms, the Temperature parameter in language model
            controls how creative or focused the AI-generated text output will
            be. Lower values of temperature make the output more predictable by
            restricting the text generation to mostly what it has seen before,
            while higher values make the output more unpredictable by allowing
            the AI to generate more unexpected content.
          </div>
          <div className="min-w-fit text-gray-500 dark:text-gray-300 text-sm mt-3">
            For example, if you set the Temperature to 0.8, the AI may generate
            responses that are less predictable and more spontaneous, while if
            you set the Temperature to 0.2, the AI may generate responses that
            are more focused on what it has already learned.
          </div>
          <div className="min-w-fit text-gray-500 dark:text-gray-300 text-sm mt-3">
            The Presence Penalty parameter in language model, on the other hand,
            controls how often the AI generates text related to the previous
            topic, or whether it shifts to a new topic. A positive value, say
            1.0, will encourage the AI to talk more about new topics and
            generate text related to them, rather than reiterating the same
            topic repeatedly. Conversely, a negative value, say -1.0, means the
            AI would be more likely to generate text related to the previous
            topic.
          </div>
          <div className="min-w-fit text-gray-500 dark:text-gray-300 text-sm mt-3">
            For instance, if you set the Presence Penalty to 1.0, the AI may
            generate responses that are more likely to shift to a new topic,
            while if set to -1.0, it may generate responses that are more likely
            to stay on the same topic.
          </div>
          <h3 className="block text-lg  text-gray-900 dark:text-white mt-3">
            Temperature Examples:
          </h3>
          <div className="min-w-fit text-gray-500 dark:text-gray-300 text-sm mt-3">
            If you ask an AI language model to complete the sentence "The sky is
            ____", with a Temperature of 0.2, it may generate responses like
            "The sky is blue" or "The sky is clear" as those are the most common
            phrases it has seen before. But with a Temperature of 0.8, it may
            generate responses like "The sky is an endless expanse of azure" or
            "The sky is a canvas for the painterly clouds."
          </div>
          <div className="min-w-fit text-gray-500 dark:text-gray-300 text-sm mt-3">
            If you ask an AI language model to write a poem about love, with a
            Temperature of 0.2, it may generate predictable phrases like "Love
            is a rose" or "Love is like a flame." But with a Temperature of 0.8,
            it may generate more unconventional and creative lines like "Love is
            a thousand paper cranes taking flight" or "Love is a thunderstorm
            brewing in the heart."
          </div>
          <h3 className="block text-lg  text-gray-900 dark:text-white mt-3">
            Presence Penalty Examples:
          </h3>
          <div className="min-w-fit text-gray-500 dark:text-gray-300 text-sm mt-3">
            If you ask an AI language model to write a story about a detective,
            with a Presence Penalty of -1.0, it may generate a story that
            focuses heavily on the detective and their investigations, with
            little deviation from the main plot. But with a Presence Penalty of
            1.0, it may generate a story that introduces new characters,
            locations, and plot twists, keeping the reader engaged and
            interested in the story.
          </div>
          <div className="min-w-fit text-gray-500 dark:text-gray-300 text-sm mt-3">
            If you ask an AI language model to generate a conversation about
            pizza toppings, with a Presence Penalty of -1.0, it may generate a
            conversation that repeatedly discusses the same toppings and doesn't
            introduce new ideas. But with a Presence Penalty of 1.0, it may
            generate a conversation that explores different pizza toppings and
            even branches out into discussions about pizza crusts, sauces, and
            cooking methods.
          </div>
        </div>
        <div className="mt-5 pt-5 border-t border-gray-500">
          <h2 className="block text-lg text-gray-900 dark:text-white">
            Guidelines for Modifying Language Model Parameters: Temperature and
            Presence Penalty
          </h2>
          <div className="min-w-fit text-gray-500 dark:text-gray-300 text-sm mt-3">
            Please be advised that the language model operates with pre-set
            default values for the Temperature and Presence Penalty parameters.
            While users may opt to adjust these values for the purpose of
            fine-tuning the generated text output, it is not recommended to
            modify these default values unless the user has a significant level
            of experience in working with language models.
          </div>
          <div className="min-w-fit text-gray-500 dark:text-gray-300 text-sm mt-3">
            Alterations to these values can cause the generated text output to
            become unpredictable and can potentially have an adverse effect on
            the quality and accuracy of the resulting text. Thus, it is strongly
            recommended that individuals who plan on modifying these parameters
            first familiarize themselves with each parameter's impacts before
            proceeding with any changes.
          </div>
        </div>
      </div>
    </PopupModal>
  );
};

export default ConfigMenu;
